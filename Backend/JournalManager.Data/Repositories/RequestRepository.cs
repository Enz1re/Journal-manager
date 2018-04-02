using System.Linq;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;
using System.Collections.Generic;

namespace JournalManager.Data.Repositories
{
    public class RequestRepository : BaseRepository<Request>, IRequestRepository
    {
        public RequestRepository(DataContext db) : base(db)
        {
        }

        public RequestStatus AddRequest(Request request)
        {
            if (Records.FirstOrDefault(r => r.Issuer.Username == request.Issuer.Username) != null)
            {
                return RequestStatus.RequestExists;
            }

            Insert(request);
            SaveChanges();

            return RequestStatus.OK;
        }

        public Request FindRequest(int id)
        {
            return Find(id);
        }

        public IEnumerable<Request> GetPendingRequests()
        {
            return Records.ToArray();
        }

        public RequestStatus RemoveRequest(int id, bool accept = true)
        {
            var request = Find(id);
            if (request == null)
            {
                return accept ? RequestStatus.RequestIsAccepted : RequestStatus.RequestIsDeclined;
            }

            return RequestStatus.OK;
        }
    }
}
