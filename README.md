# The web crawler

## Introduction

- Scrapes the web by operating on the `<a>` tags in a webpage and only hits the same host as the input webpage.
- Supports concurrency and multi socket requests.
- Prints the final result as a JSON string either on stdout or writes it to a file.
- Offers depth first and breadth first traversal of the web tree. 

## Dependencies

1. Node 12+: [Install](https://nodejs.org/en/download/)
2. npm (Comes along with node)
3. `git`

## Setup

1. Install all dependencies
2. Clone this repository: `git clone git@github.com:/web-crawler-test.git`
3. Run `npm install`

## Running the App (In Development Mode)

1. Open two terminal windows and navigate to the repository 
2. In the first window, boot up the Express server by running `npm run start`
3. In the second window, boot up the React Development server by running `npm run dev`

## Only running the Web Crawler offline

```
Usage: index [options]

Options:
  -f, --file <file>        file to store the output in
  --depth-first            Whether to traverse the tree depth first. Traverses 
                              breadth first otherwise
  -v, --verbose            Whether to show progress or not
  -n, --network-conc <nc>  Number of sockets to use at once: Defaults to Infinity
  -t, --thread-conc <tc>   Number of threads to use at once: Defaults to the 
                              number of cores on the CPU
  -w, --webpage <webpage>  For what is a tree, without a root?
  -h, --help               output usage information
  ```

## Examples

- `node index.js -w https://www.google.com`
- `node index.js -w https://www.google.com -f out.txt -t 8 -v --depth-first`

## Running tests

```
# Navigate to the `server` directory
npm run test
```