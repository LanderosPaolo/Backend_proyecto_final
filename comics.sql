/* CREATE DATABASE comics*/
/* CREATE DATABASE comics*/

-- Tabla usuario
CREATE TABLE IF NOT EXISTS "usuario" (
	"id_usuario" SERIAL PRIMARY KEY,
	"email" VARCHAR,
	"nombre" VARCHAR,
	"apellido" VARCHAR,
	"direccion" VARCHAR,
	"telefono" VARCHAR NOT NULL,
	"password" VARCHAR,
	"administrador" INTEGER NOT NULL DEFAULT 0
);

-- Datos de ejemplo para la tabla usuario
INSERT INTO "usuario" ("email", "nombre", "apellido", "direccion", "telefono", "password", "administrador")
VALUES
	('leonardovillagran@yahoo.com', 'Leonardo', 'Villagrán Chicago', 'Siempre viva 742', '2132314234', '$2a$10$xS7LOJaVslNc8Q.44jJ./uwbVYSChtc2MgDR8qjO4lbRCL93PZ/CG', 1),
	('leonardovillagran2@yahoo.com', 'Leonardo2', 'Villagrán Chicago2', 'Siempre viva 7422', '21323142342', '$2a$10$OIl3BHa4.7xMnY7LIrsHRu6d8qt4YFCbrXhSnIec6YwuR/OHfD6kS', 0),
	('leonardovillagran3@yahoo.com', 'Leonardo 3', 'Villagrán Chicago', 'Siempre viva 742', '2132314234', '$2a$10$JIHB.znSN63btgXsJLS4reQBjgZgFpJwxZlpvqEw8d14oM1dRDTha', 0),
	('yonofui@legion.cl', 'Yono', 'Fui', 'Siempre viva 742', '2132314234', '$2a$10$jmEt4XfcBVsPwK4XpWBhjepEKZ9TuxiAzkdRNiFSdEnHg07jBi3vC', 0),
	('paololanderos@gmail.com', 'Paolo', 'Landeros', 'siempre viva 742', '23423423', '$2a$10$iq7C7YUM9N6WaKixoGFd6Os.VJfYN6iJs34n/UChxoYA4vZnUfVEy', 1),
	('admin@gmail.com', 'Admin', 'Administrator', 'Siempre viva 742', '+56 12234 1234', '$2a$10$JJKBtKGVz6xNfDxM.OjqNuPzgDSoGqD635G3jD9j2ULHbLvr4e6nS', 1),
	('lorenzochacano@gmail.com', 'Lorenzo', 'Chacano', 'Siempre viva 742', '+56 12234 1234', '$2a$10$b5iFg4IA/m//DfMibSF2FOsdu89jZbUP.NzraDq0B1J7NS9vs4niC', 1);

-- Tabla producto
CREATE TABLE IF NOT EXISTS "producto" (
	"id_producto" SERIAL PRIMARY KEY,
	"nombre" VARCHAR,
	"numero" INTEGER,
	"imagen_pequena" VARCHAR,
	"imagen_grande" VARCHAR,
	"detalle" TEXT,
	"precio" INTEGER,
	"stock" INTEGER,
	"id_usuario" INTEGER,
	CONSTRAINT "producto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos de ejemplo para la tabla producto
INSERT INTO "producto" ("nombre", "numero", "imagen_pequena", "imagen_grande", "detalle", "precio", "stock", "id_usuario")
VALUES
	( 'Spawn', 307, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/3c216e36-8bf5-4e71-b5bd-445dcf86b8f9?alt=media&token=cef5b6bd-5e6d-4722-9e78-cdebb8247b8e', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/93c02200-a623-49a1-b655-abef3ec5d66e?alt=media&token=3628337d-f066-41be-81df-3c6f97a52536', 'While a strange assailant stalks the city, ripping out human hearts, another otherwordly being arrives. As his mind reels, our tortured hero remembers that he struck a deal with the devil in order to return to his beloved wife - five years after his death.', 3000, 0, 1),
	( 'Marvel Knights Spider-Man', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/4fea1562-5084-4704-97e7-68edfc208cd8?alt=media&token=04d93429-98b3-465e-b276-0dedb5af3664', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/4388a1b9-5b9d-415b-843f-551ab1bd1510?alt=media&token=24d6bc79-0482-42dc-8250-576703d9f702', 'DOWN AMONG THE DEAD PART 1 Being Spider-Man has put an enormous strain on Peter Parker''s personal life. To make matters worse, Spidey must throw down with his greatest foe, the Green Goblin!', 6000, 99, 1),
	('Superman', 1002, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/6fcfd4fc-9814-4325-a90d-854d43ea4bd9?alt=media&token=69ca1118-5eaa-4d93-839f-dfabd83e7322', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/2f855070-6779-4530-a58e-5dc7001fbbf7?alt=media&token=2d94c5d5-0c0c-41f6-a551-d784ae0a8285', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 43, 1),
	('X-Men ', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/d8990e83-9241-4b85-8868-d6f1791bc4c5?alt=media&token=1a13af49-81eb-4e25-aed1-fe1a9d3703d2', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/6e5c03b1-4f5a-4364-88de-de8c0eb843e7?alt=media&token=6443c59a-29bb-4ba5-90a8-f53443264f2e', 'THESE X-MEN ARE... FEARLESS! The heroes of Krakoa are here to save the planet! Things might be complicated between the nation of Krakoa and the rest of the world, but to the X-MEN, things are simple - you do what''s right, you protect those who need protecting and you save the world we all share. Cyclops, Marvel Girl, Sunfire, Rogue, Wolverine, Synch and Polaris are the chosen champions of mutantkind, and they will not shrink from any battle for their home planet.', 4000, 99, 1),
	('Wolverine ', 350, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/14d36987-30e0-4adf-99a7-0fe9ba9f96a2?alt=media&token=07b41301-0e43-4d61-b074-723ab423a3a6', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/b9d9e0c8-2277-47fa-9ebc-965e73cfa593?alt=media&token=22b1b6b1-d02f-480f-878a-db022f1d9abe', 'El cómic promete "nuevos enemigos" y redefinir "viejas alianzas", siendo -según la editorial- "una celebración de la historia de Logan y un perfecto punto de partida para nuevos lectores" del personaje, conocido como "Lobezno" en España y que tuvo un festival de nombres por este lado del mundo, desde "Glotón" a "Guepardo", incluyendo "Aguja Dinámica" o "Emilio Garra".', 20000, 99, 1),
	('Batman: Silence', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/8a697021-d49f-44a5-b402-dee5291be93e?alt=media&token=22c838f9-4eb5-4350-9e9e-69027f04a037', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/2e9ef135-83be-4189-9d46-63451212f0a9?alt=media&token=9e3302ff-acba-4838-bd8b-6f2b5c14cfa7', 'Batman está rescatando a un niño secuestrado por Killer Croc, después de lo cual Catwoman roba el dinero del rescate que la policía había preparado para entregar a Croc. Mientras Batman se balancea a través de Gotham City en busca de ella, su cuerda es cortada y cae al suelo, fracturándose el cráneo', 30000, 99, 1),
	( 'Batman: The Killing Joke', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/b9fc2a83-0645-4a3a-852e-8950027eb410?alt=media&token=755e7e55-bce1-4edf-a1c2-4035d58e7dc3', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/9a6033b1-ef6d-467a-ba14-f247524d4078?alt=media&token=24d32f25-5a34-4c3d-bf24-7ef00703d696', 'La historia trata sobre temas como la locura, la maldad y el bien. Su escritor expone al héroe y al villano como dos personajes sumamente parecidos y alude a que ambos pasaron por momentos muy difíciles, que los llevaron a convertirse en lo que son. También expone la posibilidad de que Batman esté tan enfermo mentalmente como el Joker, con la diferencia fundamental de que El Caballero Oscuro demuestra y canaliza su locura de forma diferente.', 20000, 96, 1),
	('Green Lantern', 50, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/51739d1e-a03c-4c56-add1-05b5b8176ff8?alt=media&token=b491ac04-3bab-480e-897a-b3d7ef7cd7f0', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/50d6b617-b239-479c-9511-9a0960528395?alt=media&token=3d96d128-8ad6-40b5-b3d1-39bbc1cda820', 'Written by Christian Alamy, Geoff Johns, Doug Mahnke. BLACKEST NIGHT spreads with an oversized anniversary issue! Surrounded by friends and enemies, Hal Jordan goes into battle with a being he will never defeat - the Black Lantern Spectre! Can Saint Walker, Sinestro and the others put a stop to this bizarre Spectre rebirth? Plus, Atrocitus reveals a tie to a power that may make him the most unbeatable of all the Lanterns!', 2000, 90, 1),
	('Deathstroke', 1, 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/1fd98871-71cf-4ea0-847b-e3f7f242a87a?alt=media&token=056fcf5d-c847-4418-bcbd-38742e7fc6d5', 'https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/405cc285-42e5-42a3-a673-8fe402dee461?alt=media&token=3abfc61d-f7a8-4158-bdca-d979d4466e3a', 'REVIEW: Explosiones, acción trepidante, una nueva y sorprendente compañera y el hijo de @#1€% más grande de todo el Universo DC. Bienvenidos a las sombras. Bienvenidos a Deathstroke Inc. Después de sufrir varias pérdidas irreparables.', 100, 91, 1);

-- Tabla likes
CREATE TABLE IF NOT EXISTS "likes" (
	"id_like" SERIAL PRIMARY KEY,
	"id_usuario" INTEGER NOT NULL,
	"id_producto" INTEGER NOT NULL,
	CONSTRAINT "likes_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto" ("id_producto") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "likes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "estado" (
	"id_estado" SERIAL PRIMARY KEY,
	"nombre" VARCHAR(255) NOT NULL

);

INSERT INTO "estado" ( "nombre") VALUES
	( 'No procesado'),
	( 'Con problemas'),
	( 'En traslado'),
	( 'Entregado'),
	('Eliminado');
	
	CREATE TABLE IF NOT EXISTS "orden_compra" (
	"id_orden_compra" SERIAL PRIMARY KEY,
	"fecha_venta" DATE NOT NULL,
	"detalle_productos" TEXT NULL DEFAULT NULL,
	"id_usuario" INTEGER NOT NULL,
	"id_estado" INTEGER NOT NULL DEFAULT '1',
	CONSTRAINT "orden_compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado" ("id_estado") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "orden_compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON UPDATE CASCADE ON DELETE CASCADE
);