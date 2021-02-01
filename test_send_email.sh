curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"subject":"my subject","text":"text message :)", "email": "hello@world.com"}' \
  http://localhost:3000/api/send-email