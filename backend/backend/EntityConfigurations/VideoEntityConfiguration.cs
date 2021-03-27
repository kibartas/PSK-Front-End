﻿using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;

namespace backend.EntityConfigurations
{
    public class VideoEntityConfiguration : IEntityTypeConfiguration<Video>
    {
        private List<Video> Videos;
        public VideoEntityConfiguration(List<Video> videos)
        {
            Videos = videos;
        }
        public void Configure(EntityTypeBuilder<Video> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Title).HasMaxLength(250);
            builder.Property(c => c.Description).HasMaxLength(500);
            builder.Property(c => c.UploadDate);
            builder.Property(c => c.DeleteDate);

            builder.HasOne(c => c.User)
                .WithMany(c => c.Videos)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}