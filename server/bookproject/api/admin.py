from django.contrib import admin
from .models import Genre, Publisher, Author, Book, BookCopy, Member, Reservation, Loan

admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(BookCopy)
admin.site.register(Member)
admin.site.register(Reservation)
admin.site.register(Loan)
