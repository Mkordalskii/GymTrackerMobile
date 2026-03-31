namespace GymTrackerMobile.API.Features.UserMemberships.Dtos
{
    public class UserMembershipDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MembershipTypeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
