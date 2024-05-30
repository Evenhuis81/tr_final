/* eslint-disable max-lines-per-function */
import {TransformedView} from 'games/library/types/tv';
import {vector} from 'games/library/vector';

const player = {
    pos: vector(2, 2),
    vel: vector(),
    acc: vector(),
    r: 0.5,
    stroke: 'rgba(255, 255, 255, 0)',
    lw: 3,
    accSpeed: 0.02,
    maxSpeed: 0.5,
    friction: 0.95,
    up: false,
    down: false,
    left: false,
    right: false,
    alpha: 0,
    alphaVel: 0,
    alphaVelLimit: 1,
    alphaAcc: 0.0001,
    phase: 1,
};

const limit = () => {
    const {maxSpeed: max, vel} = player;
    vel.x = Math.min(max, Math.max(-max, vel.x));
    vel.y = Math.min(max, Math.max(-max, vel.y));
};

const phases: Record<number, () => void> = {
    1: () => {
        // fade in
        player.alphaVel += player.alphaAcc;

        player.alpha += player.alphaVel;

        player.stroke = `rgba(255, 255, 255, ${player.alpha})`;

        if (player.alpha >= 1) {
            player.alpha = Math.PI / 2;
            player.phase++;
        }

        console.log(player.alphaVel);
    },
    2: () => {
        // oscillaterate alpha between 0.5 and 1

        // make phases change from engine, implement phaseShifter and put it in the store.

        // Make sure it is a seperate task and run this through github and make a pull request.
        player.alphaVel += player.alphaAcc;

        player.alpha += player.alphaVel;

        player.stroke = `rgba(255, 255, 255, ${(Math.sin(player.alpha) + 2) / 4 + 0.25})`;

        console.log(player.alphaVel);
    },
};

export const getPlayer = (tv: TransformedView) => {
    const {pos, vel, acc} = player;
    const update = {
        id: 2,
        name: 'player',
        fn: () => {
            if (player.up) player.acc.y = -player.accSpeed;
            if (player.down) player.acc.y = player.accSpeed;
            if (player.left) player.acc.x = -player.accSpeed;
            if (player.right) player.acc.x = player.accSpeed;

            vel.x += acc.x;
            vel.y += acc.y;

            friction();

            limit();

            pos.x += vel.x;
            pos.y += vel.y;

            acc.x = 0;
            acc.y = 0;

            phases[player.phase]();
        },
    };

    const show = {
        id: 2,
        name: 'player',
        fn: () => {
            tv.strokeCircle({x: pos.x, y: pos.y, r: player.r, lw: player.lw, stroke: player.stroke});
        },
    };

    return {
        update,
        show,
        ...player,
    };
};

const friction = () => {
    player.vel.x *= player.friction;
    player.vel.y *= player.friction;

    if (player.vel.x < 0.01 && player.vel.x > -0.01) player.vel.x = 0;
    if (player.vel.y < 0.01 && player.vel.y > -0.01) player.vel.y = 0;
};

const keyUpDown = (code: string, flag: boolean) => {
    if (code === 'KeyW') player.up = flag;
    if (code === 'KeyS') player.down = flag;
    if (code === 'KeyA') player.left = flag;
    if (code === 'KeyD') player.right = flag;
};

addEventListener('keydown', ({code}) => {
    keyUpDown(code, true);
});

addEventListener('keyup', ({code}) => {
    keyUpDown(code, false);
});
