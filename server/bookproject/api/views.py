from rest_framework import generics
from .models import Genre, Publisher, Author, Book, BookCopy, Member, Reservation, Loan
from .serializer import GenreSerializer, PublisherSerializer, AuthorSerializer, BookSerializer, BookCopySerializer, MemberSerializer, ReservationSerializer, LoanSerializer




#? generics are used to create simple, generic class-based views for CRUD operations
#? we can combine different generic views to create more complex views
#? i think when going with models with where it has a relationship with another model, we should not use the generics.

#! View All Genres
class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

#! View All Publishers
class PublisherListView(generics.ListAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

#! View All Authors
class AuthorListView(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

#! View All Books
class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

#! View All Book Copies
class BookCopyListView(generics.ListAPIView):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer

#! View All Members
class MemberListView(generics.ListAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

#! View All Reservations
class ReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

#! View All Loans
class LoanListView(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

#! Genre views - List all genres and create a new genre
class GenreListCreateView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

#! Genre view - Retrieve, update or delete a genre by ID
class GenreDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

#! Publisher views - List all publishers and create a new publisher
class PublisherListCreateView(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

#! Publisher view - Retrieve, update or delete a publisher by ID
class PublisherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

#! Author views - List all authors and create a new author
class AuthorListCreateView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

#! Author view - Retrieve, update or delete an author by ID
class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

#! Book views - List all books and create a new book
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all().select_related('publisher').prefetch_related('authors','genres')
    serializer_class = BookSerializer

#! Book view - Retrieve, update or delete a book by ID
class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

#! BookCopy views - List all book copies and create a new book copy
class BookCopyListCreateView(generics.ListCreateAPIView):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer

#! BookCopy view - Retrieve, update or delete a book copy by ID
class BookCopyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer

#! Member views - List all members and create a new member
class MemberListCreateView(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

#! Member view - Retrieve, update or delete a member by ID
class MemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

#! Reservation views - List all reservations and create a new reservation
class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

#! Reservation view - Retrieve, update or delete a reservation by ID
class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

#! Loan views - List all loans and create a new loan
class LoanListCreateView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

#! Loan view - Retrieve, update or delete a loan by ID
class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
