-- Admin accounts are stored in users with role = 'ADMIN'.
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER'
        CHECK (role IN ('USER', 'ADMIN')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_role_idx
    ON users (role);

CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    user_type TEXT NOT NULL
        CHECK (user_type IN ('parent', 'student', 'school')),
    category TEXT NOT NULL
        CHECK (category IN ('scholarship', 'concert', 'admission', 'general_query')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS inquiries_category_idx
    ON inquiries (category);

CREATE INDEX IF NOT EXISTS inquiries_name_idx
    ON inquiries (name);

CREATE INDEX IF NOT EXISTS inquiries_phone_number_idx
    ON inquiries (phone_number);

CREATE INDEX IF NOT EXISTS inquiries_user_type_idx
    ON inquiries (user_type);