FROM golang:1.17

# RUN apk update && apk add git

RUN mkdir /go/src/echo
WORKDIR /go/src/echo
# todo Get code from github.
ADD . /go/src/echo
RUN go mod download