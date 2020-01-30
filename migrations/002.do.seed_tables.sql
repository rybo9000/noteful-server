TRUNCATE folders, notes RESTART IDENTITY CASCADE;

INSERT INTO folders (folder_name)
VALUES
('Grocery Store'),
('Pharmacy'),
('Kohls'),
('Academy Sports and Outdoors');

INSERT INTO notes (note_name, modified, content, folder_id)
VALUES
('Eggs', now(), 'Pickup Eggs', 1),
('Ibuprofen', now(), 'Pickup Ibuprofen', 2),
('Baseballs', now(), 'Pickup Baseballs', 4),
('T-Shirt', now(), 'Exchange T-Shirt', 3),
('Kale', now(), 'Pickup Kale', 1),
('Ketchup', now(), 'Pickup Ketchup', 1),
('Hockey Mask', now(), 'Return Hockey Mask', 4);
