const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server'); // load app variable from exported file(es6 de-structuring)

var {toDo} = require('./../models/toDo');

const todos = [
    {text:"First test todo" },
    {text: "Second test todo"}
];

beforeEach((done)=>{
toDo.remove({}).then(()=>{
    return toDo.insertMany(todos);
}).then(()=>done());

});

describe('POST /todos', ()=>{

    it('should create a new todo',(done)=>{
      
        const text = "test todo";
        request(app)// request using supertest
        .post('/todos')
        .send({ text })//sending data with request
        .expect(200)
        .expect((res)=>{ //custom expect 
           expect(res.body.text).toBe(text);
        })//post req complete here
        .end((err,res)=>{  //check what saved in database
            if(err){
                return done(err);
            }
            toDo.find({text}).then((toDos)=>{
                expect(toDos.length).toBe(1);
                expect(toDos[0].text).toBe(text);
                done();
            }).catch( (e) => done(e)  ); //expression syntax
        });
    });
    
it('should not create any todo with invalid data', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
        if(err){
            return done(err);
        }

        toDo.find()
        .then((toDos)=>{
            expect(toDos.length).toBe(2);
            done();
        })
        .catch((e) => done(e) );
    });
});

});//describe end

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});