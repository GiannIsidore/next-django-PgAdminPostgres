from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'genre'

class Publisher(models.Model):
    """
    Represents a publisher.
    """
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(unique=True, blank=True)
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'publisher'


class Author(models.Model):
    """
    Represents an author of books.
    """
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'author'


class Book(models.Model):
    """
    Represents a book in the library system.
    """
    title = models.CharField(max_length=255)
    isbn = models.CharField(max_length=20, unique=True, blank=True, null=True)
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    publication_year = models.IntegerField(blank=True, null=True)
    language = models.CharField(max_length=50, blank=True)
    summary = models.TextField(blank=True)
    genres = models.ManyToManyField(Genre, related_name="books")
    authors = models.ManyToManyField(Author, related_name="books")
    def __str__(self):
        return self.title
    class Meta:
        db_table = 'book'


class BookCopy(models.Model):
    """
    Represents a copy of a book in the library.
    """
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="copies")
    accession_number = models.CharField(max_length=50, unique=True)
    current_status = models.CharField(max_length=20, choices=[
        ('Available', 'Available'),
        ('On Loan', 'On Loan'),
        ('Reserved', 'Reserved'),
        ('Lost', 'Lost')
    ], default='Available')
    condition_status = models.CharField(max_length=20, choices=[
        ('Good', 'Good'),
        ('Damaged', 'Damaged'),
        ('Needs Repair', 'Needs Repair'),
        ('Lost', 'Lost')
    ], default='Good')

    def __str__(self):
        return f"{self.book.title} - {self.accession_number}"

    class Meta:
        db_table = 'book_copy'


class Member(models.Model):
    """
    Represents a library member (e.g. a person who can borrow books).
    """
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(unique=True)
    membership_date = models.DateField(auto_now_add=True)
    membership_status = models.CharField(max_length=20, choices=[
        ('Active', 'Active'),
        ('Suspended', 'Suspended')
    ], default='Active')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = 'member'


class Reservation(models.Model):
    """
    Represents a reservation made by a member for a book copy.
    """
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name="reservations")
    copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE, related_name="reservations")
    reservation_date = models.DateField(auto_now_add=True)
    reservation_status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ], default='Pending')

    def __str__(self):
        return f"Reservation by {self.member} for {self.copy}"

    class Meta:
        db_table = 'reservation'


class Loan(models.Model):
    """
    Represents a loan of a book copy to a member.
    """
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name="loans")
    copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE, related_name="loans")
    loan_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    return_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ('On Loan', 'On Loan'),
        ('Returned', 'Returned'),
        ('Overdue', 'Overdue')
    ], default='On Loan')

    def __str__(self):
        return f"Loan by {self.member} for {self.copy}"

    class Meta:
        db_table = 'loan'
