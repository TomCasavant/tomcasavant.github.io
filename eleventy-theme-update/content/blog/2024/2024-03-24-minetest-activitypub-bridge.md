---
title:      "Experimenting with ActivityPub: Minetest ActivityPub Bridge"
date:       2024-03-14 
categories: activitypub, minetest, flask, python
---

I've found the easiest way to learn how software works is to try and do something stupid with it.

ActivityPub is a decentralized social networking protocol and is the thing that lets Mastodon servers communicate with Pixelfed servers communicate with Threads communicate with Flipboard and on and on.
I've done [a bit](/the-problem-with-hashtags) of [development](https://github.com/TomCasavant/tom-postmarks) on servers that *use* ActivityPub but I have never dealt with the protocol itself.

*until now.*

[Minetest](https://www.minetest.net/) is an "open source voxel game engine" and is designed to make modding very simple. Copy a few files into the `mods/` directory and suddenly you're executing lua code from within the game.
It also has an in-game chat window for communicating with other players on a given server. 

But what if it could do more than that? What if you could send and receive messages from anyone and anywhere? 

"But Tom," you ask, "won't that just clog up the chat with pointless messages from strangers?"
And yes, you would be correct. But (TODO: COME UP WITH REASON WHY THIS IS USEFUL).
 
## The Plan
For reasons other than this project I have already been looking for an ActivityPub server that will let me generate users at-will. Most servers are designed for users so they require you to add emails and passwords and useless junk that I do not care about.
Having failed to find anything that would suit my needs I created [this project](https://github.com/TomCasavant/DynamicActivityPub/) which would allow me to split this project into 2 parts.

1. The Server - A basic ActivityPub server with endpoints for creating Users, Groups, and generating ActivityPub compatible messages
2. The Mod - A Lua minetest mod that communicates with the server, when a user sends a message upload it to the server. When the server receives a message it should send that to the chat through this mod.

I had considered implementing the server in Lua so it could be built into the mod itself, but as far as I could find Minetest won't let me create web enpoints from the mod (the [few mods](https://content.minetest.net/packages/heger/webchat/) where that would be useful just have a separate server that the user has to setup the files for)


## ActivityPub Implementation
This was by far the harder of the 2 portions of the project, primarily because there is *not* a lot of documentation for this protocol. 

Well, that's not entirely true. [w3](https://www.w3.org/TR/activitypub/) has some very detailed descriptions which were incredibly useful, but the protocol is defined slightly differently from server-to-server. So something that mastodon is able to understand and accept doesn't necessarily show up on an [Mbin](https://github.com/MbinOrg/mbin) server unless certain requirements are met.

Getting a basic account to be discoverable was actually VERY easy. The base protocol calls for an endpoint for each user that returns json with a few attributes, Mastodon (and most others from what I've seen) require slightly more information including a `publicKey` and `preferredUsername`.
A JSON request to that endpoint ends up returning something like this:
```json
https://activitypubtesting.duckdns.org/users/testUser1
{
    "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://w3id.org/security/v1",
            ],
            "id": f"https://activitypubtesting.duckdns.org/users/testUser1",
            "inbox": f"https://activitypubtesting.duckdns.org/users/testUser1/inbox",
            "outbox": f"https://activitiypubtesting.duckdns.org/users/testUser1/outbox",
            "type": "Person",
            "name": f"Test User 1",
            "preferredUsername": f"testUser1",
            "publicKey": {
                "id": f"https://activitypubtesting.duckdns.org/users/testUser1#main-key",
                "owner": f"https://activitypubtesting.duckdns.org/users/testUser1",
                "publicKeyPem": THE PUBLIC KEY GENERATED FOR THIS USER
            },
    }
```

There are other optional components to this which would show up differently for different servers. If you added `attachments`, for example, Mastodon would display these as profile fields.
Essentially whenever an ActivityPub server needs to obtain information about a user it uses the JSON data from this endpoint to discover where to send data to and where to pull data from.

We can also (optionally) define a webfinger endpoint. This just lets other servers find the /users/ endpoint where a user profile is located and is always at /.well-known/webfinger.
You can experiment with webfingers here: https://webfinger.net/ and just search for `@your_username@yourserver.com`

Next (because it seemed far easier than posting messages) was following a user and receiving messages. All you need to receiver a message from another server is the `inbox` endpoint. There's no special activitypub stuff we have to do here, this just receives data from a server (my assumption is that most servers do some verification steps here whenever data is received, but I have not done that).
But, no messages will be sent to you *unless* you instruct other servers to talk to you. 

 
This is where I ran into my first hurdle- cryptographic signatures. The purpose for these is to help servers have confidence that the server that's sending you data is who they say they are. 
There are far more experienced people out there who can explain in detail how these work, but in simple terms this is the process:
- Server A generates a private key, which looks like this, then saves this and never tells anyone what this is ever:
```
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
-----END RSA PRIVATE KEY-----
```
- Server A then uses that private key to generate a public key (this public key is what we store on the /users/ endpoint). Which looks like this:
```
-----BEGIN RSA PUBLIC KEY-----
MEgCQQCo9+BpMRYQ/dL3DS2CyJxRF+j6ctbT3/Qp84+KeFhnii7NT7fELilKUSnx
S30WAvQCCo2yU1orfgqr41mM70MBAgMBAAE=
-----END RSA PUBLIC KEY----
```
*Note: I didn't do any deep work with these, there's a [python cryptography](https://cryptography.io/en/latest/) library that handles generating these
- Server A creates a message that says '@testUser1@ServerA.com wants to follow @testUser2@ServerB.com'
- Before sending that message Server A retrieves our private key from before and uses it to encrypt the message. 
- Server B receives the encrypted message and uses the publicKey from the /users/ endpoint to decrypt it
- if Server B determines that private key that signed this message is the same private key that signed the public key then it accepts it as a genuine request and will now start sending @testUser2's posts to @testUser1's inbox

There was *A LOT* of trial and error trying to get this to work properly after building this function to test my public key I learned most of my issues were because I was incorrectly returning the publicKey in the /users/ endpoint so anything sent couldn't be verified
```python
def verification_testing(public_key_url, private_key, raw_signature, signature_text):
    # Load the public key JSON from the user's URL
    public_key_response = requests.get(public_key_url)
    public_key_json = public_key_response.json()['publicKey']

    # Extract the public key from the JSON
    public_key_pem = public_key_json['publicKeyPem']

    # Load the public key
    public_key = serialization.load_pem_public_key(
        public_key_pem.encode(),
        backend=crypto_default_backend()
    )
    try:
        public_key.verify(
            raw_signature,
            signature_text,
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        print("Signature verification successful")
    except Exception as e:
        print(f"Signature verification failed: {e}")
```

After this I was now able to follow users and messages were flowing in. Fortunately for us, the process of signing messages is identical whenever a message has to be signed.
Setting up followers was pretty easy (or so I thought). Essentially in the user/inbox/ endpoint we check the data received for 'Follow', and then process the information there (*again* you should probably be doing the cryptographic verification of their signatures but I did not).
I learned during this that Mastodon requires that you send a signed 'Accept' message or else they won't treat the follow as successful.


Posting messages is pretty straight-forward, you just have to loop through all the users that follow you and send the signed message to their inboxes. My create message endpoint generates the user if it doesn't already exist in the server (since we will need to generate users for each Minetest user that exists)

The last ActivityPub type I messed around with was Group. Unlike the user (or Person) entity, there is not a very unified description of how a group functions.
Through some experimentation in [https://activitypub.academy](https://activitypub.academy/) I learned that Lemmy's groups just send Announce activities to mastodon (which mastodon displays as boosts), but I believe they're a little more complex when a lemmy community talks with another server that actually supports groups.

I didn't delve that much into it, I just need to create a Group entity that boosts all of the messages from each individual user that way you can see a feed of all the server messages.

## Minetest

Don't worry, this a much shorter topic. A minetest mod consists of 2 files (mine consists of 3), the init.lua and hte mod.conf. 
mod.conf just defines what a plugin is and allows you to set configuration variables.
init.lua contains the lua script that interacts with the minetest server. 

I also added in a json.lua file which I copied in that makes the JSON requests we have to make easier.

There's basically just 2 things we need to do in this file

- Send all new messages to the activitypub server
- And retrieve new messages (ideally, the server would just send message whenever a new one comes in but as I mentioned before I can't create an enpoint in the mod)

Minetest's built-in API lets me use `minetest.register_on_chat_message()` to call a function whenever a new chat message is entered. So, I just take that message and send it to my activitypub server:
```lua
local function new_message(player, msg)
    minetest.log("action", "Sending JSON data: " .. player)
    local data = {message = msg, username = player, groups = {"minetest"}, api_key="temporary"}
    local json_data = cjson.encode(data)
    minetest.log("action", "Sending JSON data: " .. json_data)

    local url = "http://192.168.1.75:9999/api/create_message"  -- Replace with your actual URL
 
    http.fetch({
        url = url,
        method = "POST",
        data = json_data,
        extra_headers = { "Content-Type:application/json" }
        --    ["Content-Type"] = "application/json",
        --    ["Content-Length"] = tostring(#json_data)
        --}
    }
}
```
The activitypub server will then post the message (and create the user) under the user's identity. 

Finally, we have to receive messages from our ActivityPub server. My solution for this was just identical to the web chat [mod](https://content.minetest.net/packages/heger/webchat/) where we'll regularly poll our server and check if there are any new messages, if there are new messages we send them directly to the in-game chat.

```lua
local function poll_messages()
    local url = "http://192.168.1.75:9999/api/get_recent_messages?last_id=" .. last_message_id
    http.fetch({
        url = url,
        method = "GET"
    }, function(response)
        if response.succeeded then
            local messages = minetest.parse_json(response.data)
            if messages then
                for _, message in ipairs(messages) do
                    -- Check if message ID is greater than last_message_id
                    if message.id > last_message_id then
                        minetest.chat_send_all("[ActivityPub] " .. message.username .. ": " .. message.content)
                        last_message_id = message.id
                    end
                end
            end
        else
            minetest.log("error", "Failed to fetch messages from ActivityPub server")
        end
    end)
end

-- Call the poll_messages function periodically
minetest.register_globalstep(function(dtime)
    -- Poll every 10 seconds (adjust as needed)
    if os.time() % 10 == 0 then
        poll_messages()
    end
end)
```

And this is it in action:

<video width="1200" height="300" controls>
  <source src="/video/minetest_demo.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


## Issues
This was all to experiment with ActivityPub, but I didn't do anything to secure the server. All private keys are stored unencrypted in a sqlite database, most of the endpoints that generate users and posts are not secured by any form of authentication.

I wasn't able to find much information about testing an activitypub server. I'm sure there's some way to locally run a mastodon server to test against, it feels incorrect to publicly host a website in development just to test my ActivityPub implementation.


[ActivityPub Server repo](https://github.com/TomCasavant/DynamicActivityPub)
[Minetest Mod Repo](https://github.com/TomCasavant/MinetestActivityPub)
