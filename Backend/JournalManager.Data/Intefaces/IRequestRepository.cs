using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;
using System.Collections.Generic;

namespace JournalManager.Data.Interfaces
{
    public interface IRequestRepository
    {
        Request FindRequest(int id);

        IEnumerable<Request> GetPendingRequests();

        RequestStatus AddRequest(Request request);

        RequestStatus RemoveRequest(int id, bool accept = true);
    }
}
