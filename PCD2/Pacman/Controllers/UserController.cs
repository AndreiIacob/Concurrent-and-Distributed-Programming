using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MultiplayerPacman.Data;

namespace MultiplayerPacman.Controllers
{
    [Route("Account")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected ApplicationDbContext context;
        protected UserManager<IdentityUser> userManager;
        protected SignInManager<IdentityUser> signInManager;

        public UserController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager
            )
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [Route("Register")]
        public async Task<IActionResult> CreateUserAsync()
        {

            var email = Request.Form["Input.Email"];
            var result = await userManager.CreateAsync(
                new IdentityUser()
                {

                }, "AngelBlood35");
            if(result.Succeeded)
                return Content("User was created", "text/html");
            return Content("User creation failed", "text/html");
            
        }

        [Route("Private")]
        public IActionResult Private()
        {
            return Content($"This is a private Area. Welcome {HttpContext.User.Identity.Name}", "text/html");

        }

    }
}