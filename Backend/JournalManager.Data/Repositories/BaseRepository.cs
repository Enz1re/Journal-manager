using JournalManager.Data.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace JournalManager.Data.Repositories
{
    public abstract class BaseRepository<TEntity> where TEntity : class
    {
        private DataContext _db;

        public DbSet<TEntity> Records
        {
            get
            {
                return _db.Set<TEntity>();
            }
        }

        public BaseRepository(DataContext db)
        {
            _db = db;
        }

        public int SaveChanges()
        {
            return _db.SaveChanges();
        }

        protected TEntity Find(object id)
        {
            return Records.Find(id);
        }

        protected void Insert(TEntity entity)
        {
            Records.Add(entity);
        }

        protected void Update(TEntity current, TEntity updated)
        {
            _db.Entry(current).CurrentValues.SetValues(updated);
        }

        protected TEntity Update(object id, TEntity entity)
        {
            TEntity current = Find(id);
            _db.Entry(current).CurrentValues.SetValues(entity);

            return current;
        }

        protected void Delete(TEntity entity)
        {
            Records.Remove(entity);
        }

        protected void Delete(object id)
        {
            TEntity entity = Find(id);
            Records.Remove(entity);
        }
    }
}
