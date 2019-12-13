const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql
const {User: User}     = require('../models/User');
const { Gallery } = require('../models/Gallery');
const { Category } = require('../models/Category');
const { SubCategory } = require('../models/SubCategory');
const { Item } = require('../models/Item');
const { ReviewItem } = require('../models/ReviewItem');
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
const review =  new GraphQLObjectType({
    name: 'review',
    fields: {
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        idItem: {
            type: GraphQLString
        },
        stars: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    }
})
const gallery =  new GraphQLObjectType({
    name: 'gallery',
    fields: {
        _id: {
            type: GraphQLString
        },
        photo: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        idItem: {
    type: GraphQLString
}
    }
})
const item =  new GraphQLObjectType({
    name: 'item',
    fields: {
        photos: { type: new GraphQLList(gallery) },
        _id: {
            type: GraphQLString
        },
        statusItems: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        subCategory: {
            type: GraphQLString
        },
        reviews: { type: new GraphQLList(review) },
        title: {
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
        item: {
            type: new GraphQLList(item),
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, _id) => {
                let galleryList = await
                    Item.find(_id).populate('reviews').populate('photos').populate('reviews')

                return await galleryList
            }
        },
        itemAll: {
            type: new GraphQLList(item),
            resolve: async () => {
                let galleryList = await
                    Item.find().populate('reviews')
                return await galleryList
            }
        },
        reviewId: {
            type: new GraphQLList(review),
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, _id) => {
                let rewievList = await
                    ReviewItem.find(_id)

                return await rewievList
            }
        }
    }
})
const mutation = new graphql.GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createUser: {
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
        deleteUser: {
            type: user,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {_id}) => {
                return User.findByIdAndDelete(_id);
            }
        },
        createReview: {
            type: review,
            args: {
                idItem: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                stars: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                text: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
            },
            resolve: async (_, {...req1}) => {
                const newReviewItemData = req1;

                if (await Item.findById(newReviewItemData.idItem)) {
                    const newReviewItem = await new ReviewItem(newReviewItemData);
                    const createdReviewItem = await newReviewItem.save();
                    return Item.findByIdAndUpdate(newReviewItemData.idItem, {$push: {reviews: createdReviewItem.id}}, {new: true});
                   }
                else {
                   return "Товар з таким id не знайдено!";
                }
            }
        },
        deleteReview: {
            type: review,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {_id}) => {
                return ReviewItem.findByIdAndDelete(_id);
            }
        },
        createItem: {
            type: item,
            args: {
                sort: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                limit: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                page: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                category: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                subCategory: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                title: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                titleLong: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                price: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                discount: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                statusItems: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
                           },
            resolve: async (_, {...req1}) => {

                const newItemData = req1;
                const foundedCategory =  await Category.findById(newItemData.category);
                const subCatego =  foundedCategory.subCategorys.id(newItemData.subCategory);
                if (foundedCategory && subCatego) {
                    const newItem = new Item(req1);
                    return newItem.save();
                }
                else return "kxm it's wrong"
            }
        },
        deleteItem: {
            type: item,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, {_id}) => {
                await ReviewItem.deleteMany({idItem: _id});
                await Gallery.deleteMany({idItem: _id});
                return Item.findByIdAndDelete(_id);
            }
        },
    }
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation:mutation
})

module.exports = schema
