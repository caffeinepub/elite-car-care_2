import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Booking = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    service : ServiceType;
    preferredDate : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ServiceType = {
    #carWashing;
    #bikeWash;
    #detailing;
    #polishing;
    #ceramicCoating;
    #windowFilm;
    #ppf;
    #wrapping;
    #carAccessories;
  };

  let bookings = Map.empty<Text, Booking>();

  func createReferenceId(name : Text) : Text {
    name # Time.now().toText();
  };

  public shared ({ caller }) func submitBooking(
    name : Text,
    email : Text,
    phone : Text,
    service : ServiceType,
    preferredDate : Text,
    message : Text,
  ) : async Text {
    let referenceId = createReferenceId(name);

    let booking : Booking = {
      id = referenceId;
      name;
      email;
      phone;
      service;
      preferredDate;
      message;
      timestamp = Time.now();
    };

    bookings.add(referenceId, booking);

    referenceId;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public query ({ caller }) func getBookingById(id : Text) : async Booking {
    switch (bookings.get(id)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) { booking };
    };
  };
};
