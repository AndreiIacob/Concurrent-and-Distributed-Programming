#pragma checksum "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "883fd8993c0a0ff403033a1ed2327486d92105fb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MultiplayerPacman.Pages.Pages_LeaderBoard), @"mvc.1.0.razor-page", @"/Pages/LeaderBoard.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/LeaderBoard.cshtml", typeof(MultiplayerPacman.Pages.Pages_LeaderBoard), null)]
namespace MultiplayerPacman.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\_ViewImports.cshtml"
using Microsoft.AspNetCore.Identity;

#line default
#line hidden
#line 2 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\_ViewImports.cshtml"
using MultiplayerPacman;

#line default
#line hidden
#line 3 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\_ViewImports.cshtml"
using MultiplayerPacman.Data;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"883fd8993c0a0ff403033a1ed2327486d92105fb", @"/Pages/LeaderBoard.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1dcbc13539e92b913367560476925381f9b7012a", @"/Pages/_ViewImports.cshtml")]
    public class Pages_LeaderBoard : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 3 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
  
    ViewData["Title"] = "LeaderBoard";

#line default
#line hidden
            BeginContext(93, 35, true);
            WriteLiteral("<script>\r\n        var userEmail = \"");
            EndContext();
            BeginContext(129, 30, false);
#line 7 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
                    Write(HttpContext.User.Identity.Name);

#line default
#line hidden
            EndContext();
            BeginContext(159, 147, true);
            WriteLiteral("\";\r\n</script>\r\n\r\n<h1>LeaderBoard</h1>\r\n\r\n<table class=\"table\">\r\n    <tr>\r\n        <th>\r\n            Rank\r\n        </th>\r\n        <th>\r\n            ");
            EndContext();
            BeginContext(307, 41, false);
#line 18 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
       Write(Html.DisplayNameFor(model => model.Email));

#line default
#line hidden
            EndContext();
            BeginContext(348, 43, true);
            WriteLiteral("\r\n        </th>\r\n        <th>\r\n            ");
            EndContext();
            BeginContext(392, 46, false);
#line 21 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
       Write(Html.DisplayNameFor(model => model.ScoreValue));

#line default
#line hidden
            EndContext();
            BeginContext(438, 43, true);
            WriteLiteral("\r\n        </th>\r\n        <th>\r\n            ");
            EndContext();
            BeginContext(482, 40, false);
#line 24 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
       Write(Html.DisplayNameFor(model => model.Date));

#line default
#line hidden
            EndContext();
            BeginContext(522, 47, true);
            WriteLiteral("\r\n        </th>\r\n        <th></th>\r\n    </tr>\r\n");
            EndContext();
#line 28 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
       int idx = 1; 

#line default
#line hidden
            BeginContext(592, 4, true);
            WriteLiteral("    ");
            EndContext();
#line 29 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
     foreach (var item in Model)
    {

#line default
#line hidden
            BeginContext(633, 48, true);
            WriteLiteral("        <tr>\r\n            <td>\r\n                ");
            EndContext();
            BeginContext(682, 3, false);
#line 33 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
           Write(idx);

#line default
#line hidden
            EndContext();
            BeginContext(685, 55, true);
            WriteLiteral("\r\n            </td>\r\n            <td>\r\n                ");
            EndContext();
            BeginContext(741, 40, false);
#line 36 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
           Write(Html.DisplayFor(modelItem => item.Email));

#line default
#line hidden
            EndContext();
            BeginContext(781, 55, true);
            WriteLiteral("\r\n            </td>\r\n            <td>\r\n                ");
            EndContext();
            BeginContext(837, 45, false);
#line 39 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
           Write(Html.DisplayFor(modelItem => item.ScoreValue));

#line default
#line hidden
            EndContext();
            BeginContext(882, 55, true);
            WriteLiteral("\r\n            </td>\r\n            <td>\r\n                ");
            EndContext();
            BeginContext(938, 39, false);
#line 42 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
           Write(Html.DisplayFor(modelItem => item.Date));

#line default
#line hidden
            EndContext();
            BeginContext(977, 36, true);
            WriteLiteral("\r\n            </td>\r\n        </tr>\r\n");
            EndContext();
#line 45 "C:\Users\Andrei\source\repos\MultiplayerPacman\MultiplayerPacman\Pages\LeaderBoard.cshtml"
        idx++;
    }

#line default
#line hidden
            BeginContext(1036, 12, true);
            WriteLiteral("</table>\r\n\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<Data.Models.Score>> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<IEnumerable<Data.Models.Score>> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<IEnumerable<Data.Models.Score>>)PageContext?.ViewData;
        public IEnumerable<Data.Models.Score> Model => ViewData.Model;
    }
}
#pragma warning restore 1591
