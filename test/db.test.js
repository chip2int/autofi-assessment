const expect = require('chai').expect
const CarData = require('../lib/db.js')
const sandbox = require('sinon').createSandbox()

describe('DB', function() {

    this.afterEach(() => {
        sandbox.restore()
    })
    describe('#initialize()', function() {

        it('should not thrown an error', async() => {
            parseFileStub.resolves()
            const data = await CarData.addData(providerName, fileName)
            expect(data).to.be.undefined
        })

        context('when data is not successfully added', () => {
            it('should throw an error', async() => {
                parseFileStub.throws()
                try {
                    await CarData.addData(providerName, fileName)
                } catch (err) {
                    expect(err).to.exist
                }
            })
        })
    })
})