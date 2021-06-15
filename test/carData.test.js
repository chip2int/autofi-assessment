const expect = require('chai').expect
const CarData = require('../src/carData.js')
const sandbox = require('sinon').createSandbox()

describe('CarData', function() {
    const providerName = 'provider'
    const fileName = {}
    let parseFileStub

    this.beforeEach(() => {
        fileName['mv'] = sandbox.stub()
        parseFileStub = sandbox.stub(CarData, '_parseFile')
    })
    this.afterEach(() => {
        sandbox.restore()
    })
    describe('#addData()', function() {
        context('when data is successfully added', () => {
            it('should not thrown an error', async() => {
                parseFileStub.resolves()
                const data = await CarData.addData(providerName, fileName)
                expect(data).to.be.undefined
            })
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