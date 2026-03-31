namespace GymTrackerMobile.API.Entities
{
    public class MembershipType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<UserMembership> UserMemberships { get; set; } = new List<UserMembership>();
    }
}
