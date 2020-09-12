using AutoMapper;
using EnquirySystem.Models;

namespace EnquirySystem.Helpers
{
   public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
        }
    }
}