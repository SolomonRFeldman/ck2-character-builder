FROM haproxy:2.1

RUN apt-get update && apt-get install -y haproxy 

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg

WORKDIR /etc/haproxy

CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]