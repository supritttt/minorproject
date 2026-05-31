
revoke execute on function public.has_role(uuid, public.app_role) from anon, authenticated, public;
revoke execute on function public.handle_new_user() from anon, authenticated, public;
-- get_itinerary_by_share_token: intentionally callable by anon for share-link feature (input is a 24-char random hex token; only matching itineraries are returned)
