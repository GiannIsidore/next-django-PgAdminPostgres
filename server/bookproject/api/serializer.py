from rest_framework import serializers
from .models import Genre, Publisher, Author, Book, BookCopy, Member, Reservation, Loan

# Serializer for the Genre model
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'  # Serialize all fields

# Serializer for the Publisher model
class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'  # Serialize all fields

# Serializer for the Author model
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'  # Serialize all fields

# Serializer for the Book model, including nested genres and authors
class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)  # Nested serializer for genres
    authors = AuthorSerializer(many=True, read_only=True)  # Nested serializer for authors

    class Meta:
        model = Book
        fields = '__all__'  # Serialize all fields

# Serializer for the BookCopy model, including book details
class BookCopySerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)  # Nested serializer for the related book

    class Meta:
        model = BookCopy
        fields = '__all__'  # Serialize all fields

# Serializer for the Member model
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'  # Serialize all fields

# Serializer for the Reservation model, including member and book copy details
class ReservationSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)  # Nested serializer for the member who made the reservation
    copy = BookCopySerializer(read_only=True)  # Nested serializer for the reserved book copy

    class Meta:
        model = Reservation
        fields = '__all__'  # Serialize all fields

# Serializer for the Loan model, including member and book copy details
class LoanSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)  # Nested serializer for the member who borrowed the book
    copy = BookCopySerializer(read_only=True)  # Nested serializer for the borrowed book copy

    class Meta:
        model = Loan
        fields = '__all__'  # Serialize all fields
