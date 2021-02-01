curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"subject":"my subject JOJOOJ","text":"text message :) JOJOJO", "email": "hello@world.com"}' \
 http://utring.herokuapp.com/api/send-email