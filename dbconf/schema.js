const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql
const {User: User}     = require('../models/User');
const { Gallery } = require('../models/Gallery');

const user =  new GraphQLObjectType({
    name: 'user',
    fields: {
        _id:{
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        }
            /*
            mutation {
create( firstName: "dima",lastName: "dima",
  email: "dima@gmail.com", phone: "123123123",
  password: "1111", role: "admin")
  {    _id,lastName,firstName}}

  mutation {
delete(_id:"5de4e8381bc5d6016e60eb46")
  {
    _id,lastName,firstName}}

*/
    }
})
const gallery =  new GraphQLObjectType({
    name: 'gallery',
    fields: {
        photo: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
    }
})

const queryType =  new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: new GraphQLList(user),
            resolve: async () => {
                let userList = await User.find();
                return await userList
            }
        },
        gallery: {
            type: new GraphQLList(gallery),
            resolve: async () => {
                let galleryList = await Gallery.find();
                return await galleryList
            }
        }
    }
})
const mutation = new graphql.GraphQLObjectType({
    name: 'userMutations',
    fields: {
        create: {
            type: user,
            args: {
                lastName: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                firstName: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                email: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                password: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                phone: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                role: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
            },
            resolve: (_, {lastName, firstName, email, password, phone, role}) => {
                let v = new User({lastName, firstName, email, password, phone, role});
                return v.save()
            }
        },
        delete: {
            type: user,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {_id}) => {
                return User.findByIdAndDelete(_id);
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation:mutation
})

module.exports = schema
