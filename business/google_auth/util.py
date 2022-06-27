from .credentials import CLIENT_ID,CLIENT_SECRET
from django.utils import timezone
from datetime import timedelta,datetime
from requests import get,post
BASE_URL="https://www.googleapis.com/oauth2/v3/userinfo"
def get_user_tokens(username):
    user_tokens = GoogleToken.objects.filter(user=username)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(username,code,access_token, token_type, expires_in, refresh_token):
    print("hello from update")
    print(username)
    print(expires_in)
    tokens = get_user_tokens(username)
    if tokens:
        expires_in=timezone.now()+timedelta(seconds=expires_in)
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        expires_in=timezone.now()+timedelta(seconds=expires_in)
        tokens = GoogleToken(user=username,code=code,access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()
def is_google_authenticated(username):
    tokens = get_user_tokens(username)
    if tokens:
        print("token is going")
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            print("token expired")
            refresh_google_token(username)
        else:
            print("token not expired")
        return True
    return False

def refresh_google_token(username):
    refresh_token = get_user_tokens(username).refresh_token
    code=get_user_tokens(username).code
    response = post('https://oauth2.googleapis.com/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    print(access_token,refresh_token)
    update_or_create_user_tokens(
        username,code,access_token, token_type, expires_in, refresh_token)


def get_user_info(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + tokens.access_token}

    response = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}