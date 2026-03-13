import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
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

  type OldServiceType = {
    #carWashing;
    #detailing;
    #paintProtection;
    #interiorCleaning;
    #windowTinting;
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

  type OldBooking = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    service : OldServiceType;
    preferredDate : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    bookings : Map.Map<Text, OldBooking>;
  };

  type NewActor = {
    bookings : Map.Map<Text, Booking>;
  };

  func convertServiceType(oldService : OldServiceType) : ServiceType {
    switch (oldService) {
      case (#carWashing) { #carWashing };
      case (#detailing) { #detailing };
      case (#paintProtection) { #ceramicCoating };
      case (#interiorCleaning) { #carAccessories };
      case (#windowTinting) { #windowFilm };
    };
  };

  func convertBooking(oldBooking : OldBooking) : Booking {
    {
      oldBooking with
      service = convertServiceType(oldBooking.service);
    };
  };

  public func run(old : OldActor) : NewActor {
    let newBookings = old.bookings.map<Text, OldBooking, Booking>(
      func(_id, oldBooking) {
        convertBooking(oldBooking);
      }
    );
    { bookings = newBookings };
  };
};
