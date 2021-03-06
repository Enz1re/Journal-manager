﻿using JournalManager.Data.Models.Data;

namespace JournalManager.Data.Models.Request
{
    public class DisciplineRequestModel
    {
        public string FacultyName { get; set; }

        public string DisciplineName { get; set; }

        public Term[] Terms { get; set; }
    }
}
