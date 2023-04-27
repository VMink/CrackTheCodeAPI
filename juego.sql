USE [juego]
GO
/****** Object:  Table [dbo].[habilidad]    Script Date: 26/04/2023 09:43:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[habilidad](
	[idHabilidad] [int] IDENTITY(1,1) NOT NULL,
	[idMinijuego] [int] NOT NULL,
	[nombreHabilidad] [varchar](50) NULL,
 CONSTRAINT [PK_habilidad] PRIMARY KEY CLUSTERED 
(
	[idHabilidad] ASC,
	[idMinijuego] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[minijuego]    Script Date: 26/04/2023 09:43:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[minijuego](
	[idMinijuego] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[cantidadNiveles] [int] NULL,
	[puntajeMaximo] [int] NULL,
 CONSTRAINT [PK_minijuego] PRIMARY KEY CLUSTERED 
(
	[idMinijuego] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[partida]    Script Date: 26/04/2023 09:43:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[partida](
	[idUsuario] [varchar](50) NOT NULL,
	[idPartida] [int] IDENTITY(1,1) NOT NULL,
	[fechaHoraInicio] [datetime] NULL,
	[fechaHoraFinal] [datetime] NULL,
	[puntuacionAcumulada] [int] NULL,
 CONSTRAINT [PK_partida] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC,
	[idPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[partida-minijuego]    Script Date: 26/04/2023 09:43:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[partida-minijuego](
	[idUsuario] [varchar](50) NOT NULL,
	[idPartida] [int] NOT NULL,
	[idMinijuego] [int] NOT NULL,
	[nivelAlcanzado] [int] NULL,
	[scoreHabilidadAlcanzado] [int] NULL,
 CONSTRAINT [PK_partida-minijuego_1] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC,
	[idPartida] ASC,
	[idMinijuego] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 26/04/2023 09:43:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idUsuario] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[fechaNacimiento] [date] NULL,
	[contraseña] [varchar](50) NULL,
	[correo] [varchar](50) NULL,
	[telefono] [varchar](15) NULL,
	[pais] [varchar](50) NULL,
	[admin] [tinyint] NULL,
 CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[usuario] ADD  CONSTRAINT [DF_usuario_admin]  DEFAULT ((0)) FOR [admin]
GO
ALTER TABLE [dbo].[habilidad]  WITH CHECK ADD  CONSTRAINT [FK_habilidad_minijuego] FOREIGN KEY([idMinijuego])
REFERENCES [dbo].[minijuego] ([idMinijuego])
GO
ALTER TABLE [dbo].[habilidad] CHECK CONSTRAINT [FK_habilidad_minijuego]
GO
ALTER TABLE [dbo].[partida]  WITH CHECK ADD  CONSTRAINT [FK_partida_usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[partida] CHECK CONSTRAINT [FK_partida_usuario]
GO
ALTER TABLE [dbo].[partida-minijuego]  WITH CHECK ADD  CONSTRAINT [FK_partida-minijuego_minijuego] FOREIGN KEY([idMinijuego])
REFERENCES [dbo].[minijuego] ([idMinijuego])
GO
ALTER TABLE [dbo].[partida-minijuego] CHECK CONSTRAINT [FK_partida-minijuego_minijuego]
GO
ALTER TABLE [dbo].[partida-minijuego]  WITH CHECK ADD  CONSTRAINT [FK_partida-minijuego_partida] FOREIGN KEY([idUsuario], [idPartida])
REFERENCES [dbo].[partida] ([idUsuario], [idPartida])
GO
ALTER TABLE [dbo].[partida-minijuego] CHECK CONSTRAINT [FK_partida-minijuego_partida]
GO
USE [master]
GO
ALTER DATABASE [juego] SET  READ_WRITE 
GO
