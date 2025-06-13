-- Создаем bucket для аудиокниг
INSERT INTO storage.buckets (id, name, public) VALUES ('audiobooks', 'audiobooks', false);

-- Создаем политики доступа для bucket
CREATE POLICY "Аудиокниги доступны только авторизованным пользователям"
ON storage.objects FOR SELECT
USING (bucket_id = 'audiobooks' AND auth.role() = 'authenticated');

CREATE POLICY "Только администраторы могут загружать аудиокниги"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audiobooks' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Только администраторы могут обновлять аудиокниги"
ON storage.objects FOR UPDATE
USING (bucket_id = 'audiobooks' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Только администраторы могут удалять аудиокниги"
ON storage.objects FOR DELETE
USING (bucket_id = 'audiobooks' AND auth.jwt() ->> 'role' = 'admin');

-- Добавляем поле для хранения пути к аудиофайлу в таблицу books
ALTER TABLE books ADD COLUMN audio_path TEXT; 