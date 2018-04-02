using JournalManager.Data.Constants;

namespace JournalManager.Data.Models.Business
{
    public sealed class RequestStatus : Status
    {
        public static RequestStatus OK => new RequestStatus(Strings.OK);

        public static RequestStatus RequestExists => new RequestStatus(Strings.RequestAlreadyExists);

        public static RequestStatus RequestIsAccepted => new RequestStatus(Strings.RequestIsAlreadyAccepted);

        public static RequestStatus RequestIsDeclined => new RequestStatus(Strings.RequestIsAlreadyDeclined);

        private RequestStatus(string message)
        {
            Message = message;
        }
    }
}
