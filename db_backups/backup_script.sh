#!/bin/bash
cd /Users/Andrew/Desktop/Computer\ Science/PersonalWebsite
pg_dump -U Andrew personalwebsite_db > db_backups/backup_$(date +%Y%m%d).sql
