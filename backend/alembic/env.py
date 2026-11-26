from logging.config import fileConfig

from alembic import context

from app.core.database import DATABASE_URL, engine
from app.db.base import Base

# Alembic Config object providing access to values in alembic.ini.
config = context.config

# Configure Python logging from alembic.ini when present.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Shared SQLAlchemy metadata for future 'autogenerate' migration support.
# Future model modules will be imported before autogenerate runs so their
# tables are registered on Base.metadata.
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode using the application database URL."""
    url = DATABASE_URL.render_as_string(hide_password=False)
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode using the application SQLAlchemy engine."""
    try:
        with engine.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata,
            )

            with context.begin_transaction():
                context.run_migrations()
    finally:
        engine.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
