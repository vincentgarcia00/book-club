using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using HtmlAgilityPack;

namespace BookClubApi
{
    class Program
    {
        // If modifying these scopes, delete your previously saved credentials
        // at ~/.credentials/sheets.googleapis.com-dotnet-quickstart.json
        static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static string ApplicationName = "Book Club API";

        static void Main(string[] args)
        {
            UserCredential credential;

            using (var stream = new FileStream("properties/credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }

            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            var goodreadsUrl = "https://www.goodreads.com/book/show/7604.Lolita";
            var doc = new HtmlWeb();
            var page = doc.Load(goodreadsUrl);
            var title = page.DocumentNode.SelectSingleNode("//h1[@id='bookTitle']").InnerText.Trim();
            var author = page.DocumentNode.SelectSingleNode("//div[@id='bookAuthors']").InnerText.Trim();
            var series = page.DocumentNode.SelectSingleNode("//h2[@id='bookSeries']").InnerText.Trim();
            var details = page.DocumentNode.SelectSingleNode("//div[@id='details']");
            
            // Define request parameters.
            // String spreadsheetId = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms";
            // String range = "Class Data!A2:E";
            // SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(spreadsheetId, range);
            var spreadsheetId = "1axUjs0b8RpncGU872mVRW94jRwVAroS3kMmktydGRU0";

            var body = new ValueRange();
            body.Values = new List<IList<object>>();
            body.Values.Insert(0, new List<object> {
                "Upcoming",
                title,
                author,
                series,
                "Year Published",
                null, // gender
                null, // ethnicity
                null, // other
                null, // nationality
                null, // recommended by
                null, // translated
                null, // sexual assault
                null, // date read
                null, // genre
                null, // best of
                null, // worst of
                goodreadsUrl, // goodreads link
                null, // image url
            });
            
            var request = service.Spreadsheets.Values.Append(body, spreadsheetId, "A2");
            request.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.RAW;
            request.InsertDataOption = SpreadsheetsResource.ValuesResource.AppendRequest.InsertDataOptionEnum.INSERTROWS;
            request.ResponseValueRenderOption = SpreadsheetsResource.ValuesResource.AppendRequest.ResponseValueRenderOptionEnum.FORMATTEDVALUE;

            AppendValuesResponse response = request.Execute();
        }
    }
}