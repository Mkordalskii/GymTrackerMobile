namespace GymTrackerMobile.API.Features.MembershipTypes.Dtos
{
    public class MembershipTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
