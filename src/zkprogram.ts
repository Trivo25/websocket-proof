import {
  SelfProof,
  Field,
  ZkProgram,
  verify,
  Proof,
  JsonProof,
  Provable,
  Empty,
  Poseidon,
} from 'o1js';

export { MyProgram, MyProof };

let MyProgram = ZkProgram({
  name: 'example-with-output',
  publicOutput: Field,

  methods: {
    baseCase: {
      privateInputs: [],
      async method() {
        return Field(0);
      },
    },

    inductiveCase: {
      privateInputs: [SelfProof],
      async method(earlierProof: SelfProof<Empty, Field>) {
        earlierProof.verify();
        return earlierProof.publicOutput.add(1);
      },
    },
  },
});

const MyProof = ZkProgram.Proof(MyProgram);
