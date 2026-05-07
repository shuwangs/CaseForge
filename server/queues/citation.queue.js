import { Queue } from 'bullmq';

const citationsQueue = new Queue('foo');

async function addJobs() {
    await citationsQueue.add('myJobName', { foo: 'bar' });
    await citationsQueue.add('myJobName', { qux: 'baz' });
}

await addJobs();