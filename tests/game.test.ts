import request from 'supertest';
import app from '../index';
let gameId : string;

describe('Game API', () => {
    it("Should get list game", async () => {
        const response = await request(app).get("/games");
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    })

    it("Should create game", async () => {
        let newGame = {
            game_id: "fesfsesfsegem",
            title: "abc",
            genre: "xyz",
            price: 23,
            user_id: "U01"
        }
        const response = await request(app).post("/games").send(newGame);
        expect(response.status).toEqual(200);
        // console.log(response.body);
        expect(response.body).toBeInstanceOf(Object);
        gameId = newGame.game_id;
    })

    it("Should find game by id", async () => {
        const response = await request(app).get(`/games/${gameId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    })

    it("Should update game by id", async () => {
        const gameUpdate = {
            title: "test",
            genre: "test",
            price: 233
        }
        const response = await request(app).patch(`/games/${gameId}`).send(gameUpdate);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    })

    it("Should delete game by id", async () => {
        const response = await request(app).delete(`/games/${gameId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    })

});

