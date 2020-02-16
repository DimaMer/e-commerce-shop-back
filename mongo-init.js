db.createUser(
      {
        user: "commerce",
            pwd: "adfSADF",
            roles: [ { role: "readWrite", db: "commerce" }]
      }
)
