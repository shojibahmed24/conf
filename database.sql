-- Noor Deen Database Schema

-- Surahs Table
CREATE TABLE surahs (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    name_arabic TEXT NOT NULL,
    name_english TEXT NOT NULL,
    name_bangla TEXT NOT NULL,
    revelation_type TEXT CHECK (revelation_type IN ('Meccan', 'Medinan')),
    total_ayahs INTEGER NOT NULL
);

-- Ayahs Table
CREATE TABLE ayahs (
    id SERIAL PRIMARY KEY,
    surah_id INTEGER REFERENCES surahs(id) ON DELETE CASCADE,
    ayah_number INTEGER NOT NULL,
    text_arabic TEXT NOT NULL,
    text_bangla TEXT NOT NULL,
    audio_arabic_url TEXT,
    audio_bangla_url TEXT,
    UNIQUE(surah_id, ayah_number)
);

-- Hadiths Table
CREATE TABLE hadiths (
    id SERIAL PRIMARY KEY,
    collection TEXT NOT NULL,
    book_name TEXT,
    hadith_number TEXT,
    narrator TEXT,
    text_arabic TEXT,
    text_bangla TEXT NOT NULL,
    grade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Progress
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    last_surah_id INTEGER REFERENCES surahs(id),
    last_ayah_number INTEGER,
    tasbih_total_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- App Settings (Admin Controlled)
CREATE TABLE app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial Ramadan Mode setting
INSERT INTO app_settings (key, value) VALUES ('ramadan_mode', '{"enabled": false, "year": 2024}');