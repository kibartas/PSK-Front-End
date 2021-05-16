using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.IO;
using Xabe.FFmpeg;
using Xabe.FFmpeg.Downloader;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            FFmpegDownloader.GetLatestVersion(FFmpegVersion.Official);
            FFmpeg.SetExecutablesPath(Directory.GetCurrentDirectory());
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}