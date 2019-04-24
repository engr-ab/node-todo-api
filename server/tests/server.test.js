const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server'); // load app variable from exported file(es6 de-structuring)

var {toDo} = require('./../models/toDo');

beforeEach((done)=>{
toDo.remove({}).then(()=>{
    done();
});

});

describe('POST /todo', ()=>{

    it('should create a new todo',(done)=>{
      
        const text = "test todo";
        request(app)// request using supertest
        .post('/todo')
        .send({ text })//sending data with request
        .expect(200)
        .expect((res)=>{ //custom expect 
           expect(res.body.text).toBe(text);
        })//post req complete here
        .end((err,res)=>{  //check what saved in database
            if(err){
                return done(err);
            }
            toDo.find().then((toDos)=>{
                expect(toDos.length).toBe(1);
                expect(toDos[0].text).toBe(text);
                done();
            }).catch( (e) => done(e)  ); //expression syntax
        });
    });
    
it('should not create any todo with invalid data', (done)=>{
    request(app)
    .post('/todo')
    .send({})
    .expect(400)
    .end((err,res)=>{
        if(err){
            return done(err);
        }

        toDo.find()
        .then((toDos)=>{
            expect(toDos.length).toBe(0);
            done();
        })
        .catch((e) => done(e) );
    });
});

});//describe end
