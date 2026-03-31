namespace GymTrackerMobile.API.Entities
{
    public class UserMembership
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MembershipTypeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        public MembershipType MembershipType { get; set; } = null!;
    }
}
