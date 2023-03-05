## Redis Basics

Redis is an in-memory data structure store, used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, and more. Redis is known for its high performance and scalability, making it a popular choice for modern web applications.

## Installation

Redis can be installed on most operating systems using package managers such as apt, yum, or brew. Alternatively, Redis can be installed from source by downloading the latest version from the official website.

## Getting Started

To start Redis, simply run the `redis-server` command. By default, Redis listens on port 6379.

To interact with Redis, you can use the `redis-cli` command-line interface. For example, to set a key-value pair, use the `SET` command:

`SET mykey "Hello World"`
`GET mykey "Hello World"`

## Data Structures

Redis supports various data structures:

- Strings: store a string value
- Hashes: store field-value pairs
- Lists: store a list of values
- Sets: store an unordered set of values
- Sorted Sets: store an ordered set of values with a score

To interact with these data structures, Redis provides a set of commands. For example, to add an item to a list, use the `LPUSH` command:

`LPUSH mylist "item1"`

## Persistence

By default, Redis stores data only in memory. However, Redis provides two mechanisms for persisting data to disk:

RDB (Redis Database): a point-in-time snapshot of the dataset
AOF (Append-Only File): an append-only log of all write operations
By default, Redis saves data to disk every 5 minutes if at least 1000 keys have changed. These settings can be configured in the redis.conf configuration file.

## Clear Redis

To clear all the data from Redis, you can use the `FLUSHALL` command. This command removes all the keys and their associated values from all the databases in the Redis server.

## To see all keys

To see a list of all the keys in the database, type the `keys *` command and press Enter. This will show you all the keys stored in the database.

## Using Redis for Pub-Sub

To use Pub/Sub Messaging in Redis, you need to use the `PUBLISH`, `SUBSCRIBE`, and `UNSUBSCRIBE` commands in the redis-cli or a Redis client library.

Here are the steps to use Pub/Sub Messaging in Redis:

- Open two or more terminals or command prompts to simulate multiple clients.
- Start the redis-cli in each terminal or command prompt using the `redis-cli` command.
- In one terminal or command prompt, subscribe to a channel by typing `SUBSCRIBE channel_name` and pressing Enter, replacing channel_name with the name of the channel you want to subscribe to.
- In another terminal or command prompt, publish a message to the same channel by typing `PUBLISH channel_name` message and pressing Enter, replacing channel_name with the name of the channel and message with the message you want to publish.
- The message will be received by the client subscribed to the channel, and it will be displayed in the terminal or command prompt.
