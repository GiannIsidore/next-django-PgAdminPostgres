from django.urls import path
from .views import GenreListCreateView, GenreDetailView, PublisherListCreateView, PublisherDetailView, AuthorListCreateView, AuthorDetailView, BookListCreateView, BookDetailView, BookCopyListCreateView, BookCopyDetailView, MemberListCreateView, MemberDetailView, ReservationListCreateView, ReservationDetailView, LoanListCreateView, LoanDetailView, GenreListView, PublisherListView, AuthorListView, BookListView, BookCopyListView, MemberListView, ReservationListView, LoanListView

urlpatterns = [
    # View All URLs (List views)
    path('genres/all/', GenreListView.as_view(), name='genre-list'),  # List all genres
    path('publishers/all/', PublisherListView.as_view(), name='publisher-list'),  # List all publishers
    path('authors/all/', AuthorListView.as_view(), name='author-list'),  # List all authors
    path('books/all/', BookListView.as_view(), name='book-list'),  # List all books
    path('bookcopies/all/', BookCopyListView.as_view(), name='bookcopy-list'),  # List all book copies
    path('members/all/', MemberListView.as_view(), name='member-list'),  # List all members
    path('reservations/all/', ReservationListView.as_view(), name='reservation-list'),  # List all reservations
    path('loans/all/', LoanListView.as_view(), name='loan-list'),  # List all loans

    # Genre URLs (List/Create and Detail views)
    path('genres/', GenreListCreateView.as_view(), name='genre-list-create'),  # List and Create genres
    path('genres/<int:pk>/', GenreDetailView.as_view(), name='genre-detail'),  # Genre Detail (Retrieve/Update/Delete)

    # Publisher URLs (List/Create and Detail views)
    path('publishers/', PublisherListCreateView.as_view(), name='publisher-list-create'),  # List and Create publishers
    path('publishers/<int:pk>/', PublisherDetailView.as_view(), name='publisher-detail'),  # Publisher Detail

    # Author URLs (List/Create and Detail views)
    path('authors/', AuthorListCreateView.as_view(), name='author-list-create'),  # List and Create authors
    path('authors/<int:pk>/', AuthorDetailView.as_view(), name='author-detail'),  # Author Detail

    # Book URLs (List/Create and Detail views)
    path('books/', BookListCreateView.as_view(), name='book-list-create'),  # List and Create books
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),  # Book Detail

    # BookCopy URLs (List/Create and Detail views)
    path('bookcopies/', BookCopyListCreateView.as_view(), name='bookcopy-list-create'),  # List and Create book copies
    path('bookcopies/<int:pk>/', BookCopyDetailView.as_view(), name='bookcopy-detail'),  # BookCopy Detail

    # Member URLs (List/Create and Detail views)
    path('members/', MemberListCreateView.as_view(), name='member-list-create'),  # List and Create members
    path('members/<int:pk>/', MemberDetailView.as_view(), name='member-detail'),  # Member Detail

    # Reservation URLs (List/Create and Detail views)
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list-create'),  # List and Create reservations
    path('reservations/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),  # Reservation Detail

    # Loan URLs (List/Create and Detail views)
    path('loans/', LoanListCreateView.as_view(), name='loan-list-create'),  # List and Create loans
    path('loans/<int:pk>/', LoanDetailView.as_view(), name='loan-detail'),  # Loan Detail
]
