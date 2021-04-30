﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace backend.Utils
{
    public static class Regex_validation
    {
        private static readonly string EMAIL_REGEX = @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        private static readonly string NAME_REGEX = @"^[A-Za-z]+$";
        private static readonly string PASSWORD_REGEX = @"^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,})$";

        public static bool isEmailValid(string email)
        {
            return Regex.IsMatch(email, EMAIL_REGEX);
        }

        public static bool isNameValid(string name)
        {
            return Regex.IsMatch(name, NAME_REGEX);
        }

        public static bool isPasswordValid(string password)
        {
            return Regex.IsMatch(password, PASSWORD_REGEX);
        }
    }
}