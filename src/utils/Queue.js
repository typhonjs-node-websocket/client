/**
 * Provides a single consumer queue.
 */
export default class Queue
{
   /**
    * As the name implies, `consumer` is the sole consumer of the queue. It gets called with each element of the
    * queue and its return value serves as a ack, determining whether the element is removed or not from the queue,
    * allowing then subsequent elements to be processed.
    *
    * @param {Function} consumer - The sole consumer of the queue.
    */
   constructor(consumer)
   {
      /**
       * The consumer of the queue.
       *
       * @type {Function}
       */
      this.consumer = consumer;

      /**
       * Storage for the queue.
       *
       * @type {Array}
       */
      this.queue = [];
   }

   /**
    * Pushes an element on the queue.
    *
    * @param {*}  element - An element.
    *
    * @returns {Queue} This queue instance.
    */
   push(element)
   {
      this.queue.push(element);

      return this.process();
   }

   /**
    * Pushes an element on the queue.
    *
    * @param {Iterable<*>}  elements - An array of elements.
    *
    * @returns {Queue} This queue instance.
    */
   pushAll(elements)
   {
      this.queue.push(...elements);

      return this.process();
   }

   /**
    * Processes the queue.
    *
    * @returns {Queue} This queue instance.
    */
   process()
   {
      setTimeout(() =>
      {
         if (this.queue.length !== 0)
         {
            const ack = this.consumer(this.queue[0]);
            if (ack)
            {
               this.queue.shift();
               this.process();
            }
         }
      }, 0);

      return this;
   }

   /**
    * Empties the queue.
    *
    * @returns {Queue} This queue instance.
    */
   empty()
   {
      this.queue = [];

      return this;
   }
}
